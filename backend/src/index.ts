import FireFly from "@hyperledger/firefly-sdk";
import bodyparser from "body-parser";
import express from "express";
import simplestorage from "../../solidity/artifacts/contracts/simple_storage.sol/SimpleStorage.json";
import pollmanager from "../../solidity/artifacts/contracts/poll_manager.sol/PollManager.json";

const PORT = 4001;
const HOST = "http://localhost:5000";
const NAMESPACE = "default";
const SIMPLE_STORAGE_ADDRESS = "0x0885e6507dB1864377442bEC4cF20cf12E97Ff64";
const POLL_MANAGER_ADDRESS = "0x0730B7e627718dd7f26538bE762ea8937EB21e54";
const app = express();
const firefly = new FireFly({
  host: HOST,
  namespace: NAMESPACE,
});

const ffiAndApiVersion = 2;
const ssFfiName: string = `simpleStorageFFI-${ffiAndApiVersion}`;
const ssApiName: string = `simpleStorageApi-${ffiAndApiVersion}`;

const pollManagerFfiName: string = `pollManagerFFI-${ffiAndApiVersion}`;
const pollManagerApiName: string = `pollManagerApi-${ffiAndApiVersion}`;

app.use(bodyparser.json());

app.get("/api/poll/:pollAddress", async (req, res) => {
  const response = await firefly.queryContractAPI(
    pollManagerApiName,
    "getPoll",
    {
      input: { pollAddress: req.params.pollAddress },
    }
  );
  res.send(response.output);
});

app.get("/api/polls", async (req, res) => {
  const resp = await firefly.queryContractAPI(
    pollManagerApiName,
    "getPolls",
    {}
  );
  res.send(resp.output);
});

app.post("/api/poll", async (req, res) => {
  try {
    const fireflyRes = await firefly.invokeContractAPI(
      pollManagerApiName,
      "createPoll",
      {
        input: {
          title: req.body.title,
          options: req.body.pollOptions,
          creator: req.body.creatorAddress,
        },
      }
    );

    console.log(fireflyRes);

    res.status(202).send({
      id: fireflyRes.id,
    });
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    res.status(500).send({
      error: e.message,
    });
  }
});

app.post("/api/vote", async (req, res) => {
  try {
    const fireflyRes = await firefly.invokeContractAPI(
      pollManagerApiName,
      "voteOnPoll",
      {
        input: {
          option: req.body.option,
          pollAddress: req.body.pollAddress,
          voter: req.body.account,
        },
      }
    );

    res.status(202).send({
      id: fireflyRes.id,
    });
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    res.status(500).send({
      error: e.message,
    });
  }
});

app.get("/api/value", async (req, res) => {
  res.send(await firefly.queryContractAPI(ssApiName, "get", {}));
});

app.post("/api/value", async (req, res) => {
  console.log(req.body.x);
  try {
    const fireflyRes = await firefly.invokeContractAPI(ssApiName, "set", {
      input: {
        x: req.body.x,
      },
    });
    res.status(202).send({
      id: fireflyRes.id,
    });
    /* eslint-disable  @typescript-eslint/no-explicit-any */
  } catch (e: any) {
    res.status(500).send({
      error: e.message,
    });
  }
});

async function init() {
  // Simple storage
  await firefly
    .generateContractInterface({
      name: ssFfiName,
      namespace: NAMESPACE,
      version: "1.0",
      description: "Deployed simple-storage contract",
      input: {
        abi: simplestorage.abi,
      },
    })
    .then(async (ssGeneratedFFI) => {
      if (!ssGeneratedFFI) return;
      return await firefly.createContractInterface(ssGeneratedFFI, {
        confirm: true,
      });
    })
    .then(async (ssContractInterface) => {
      if (!ssContractInterface) return;
      return await firefly.createContractAPI(
        {
          interface: {
            id: ssContractInterface.id,
          },
          location: {
            address: SIMPLE_STORAGE_ADDRESS,
          },
          name: ssApiName,
        },
        { confirm: true }
      );
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        console.log("'simpleStorageFFI' already exists in FireFly. Ignoring.");
      } else {
        return;
      }
    });

  // Poll Manager
  await firefly
    .generateContractInterface({
      name: pollManagerFfiName,
      namespace: NAMESPACE,
      version: "1.0",
      description: "Deployed poll manager contract",
      input: {
        abi: pollmanager.abi,
      },
    })
    .then(async (pollManagerFfi) => {
      if (!pollManagerFfi) return;
      return await firefly.createContractInterface(pollManagerFfi, {
        confirm: true,
      });
    })
    .then(async (pollManagerContractInterface) => {
      if (!pollManagerContractInterface) return;
      return await firefly.createContractAPI(
        {
          interface: {
            id: pollManagerContractInterface.id,
          },
          location: {
            address: POLL_MANAGER_ADDRESS,
          },
          name: pollManagerApiName,
        },
        { confirm: true }
      );
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        console.log("'pollManagerFFI' already exists in FireFly. Ignoring.");
      } else {
        return;
      }
    });

  // Listeners
  // Simple storage listener
  await firefly
    .createContractAPIListener(ssApiName, "Changed", {
      topic: "changed",
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        console.log(
          "Simple storage 'changed' event listener already exists in FireFly. Ignoring."
        );
      } else {
        console.log(
          `Error creating listener for simple_storage "changed" event: ${err.message}`
        );
      }
    });

  // Poll Manager listeners
  await firefly
    .createContractAPIListener(pollManagerApiName, "PollCreated", {
      topic: "pollcreated",
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        console.log(
          "Poll manager 'poll created' event listener already exists in FireFly. Ignoring."
        );
      } else {
        console.log(
          `Error creating listener for poll manager "poll created" event: ${err.message}`
        );
      }
    });

  await firefly
    .createContractAPIListener(pollManagerApiName, "VoteCast", {
      topic: "votecast",
    })
    .catch((e) => {
      const err = JSON.parse(JSON.stringify(e.originalError));

      if (err.status === 409) {
        console.log(
          "Poll manager 'vote cast' event listener already exists in FireFly. Ignoring."
        );
      } else {
        console.log(
          `Error creating listener for poll manager "vote cast" event: ${err.message}`
        );
      }
    });

  firefly.listen(
    {
      filter: {
        events: "blockchain_event_received",
      },
    },
    async (socket, event) => {
      console.log(
        `${event.blockchainEvent?.info.signature}: ${JSON.stringify(
          event.blockchainEvent?.output,
          null,
          2
        )}`
      );
    }
  );

  // Start listening
  app.listen(PORT, () =>
    console.log(`dPoll backend listening on port ${PORT}!`)
  );
}

init().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});

module.exports = {
  app,
};
