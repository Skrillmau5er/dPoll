import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CreatePoll from "./CreatePoll";
import Polls from "./Polls";
import Layout from "./Layout";
import Poll from "./Poll";
import { GlobalContextProvider } from "../util/globalContext";
import { useState } from "react";

function App() {
  const [showConnectAccountModal, setShowConnectAccountModal] = useState(false);
  return (
    <GlobalContextProvider
      value={{ showConnectAccountModal, setShowConnectAccountModal }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePoll />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/poll/:pollAddress" element={<Poll />} />
        </Routes>
      </Layout>
    </GlobalContextProvider>
  );
}

export default App;
