export const createPoll = async (
  title: string,
  pollOptions: string[],
  creatorAddress: string
) => {
  try {
    const res = await fetch(`/api/poll`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        pollOptions,
        creatorAddress,
      }),
    });
    const resp = await res.json();
    if (!res.ok) {
      console.error(resp.error);
      return { success: false, error: resp.error };
    }
    return { success: true, error: null };
  } catch (err: any) {
    console.error(err.stack);
    return { success: false, error: err.stack };
  }
};

export const getPolls = async () => {
  try {
    const res = await fetch(`/api/polls`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const resp = await res.json();
    if (!res.ok) {
      throw resp.error;
    }
    return resp;
  } catch (err: any) {
    throw err.stack;
  }
};

export const getPoll = async (pollAddress: string) => {
  try {
    const res = await fetch(`/api/poll/${pollAddress}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const resp = await res.json();
    if (!res.ok) {
      throw resp.error;
    }
    return resp;
  } catch (err: any) {
    throw err.stack;
  }
};

export const voteOnPoll = async (
  pollAddress: string,
  option: string,
  account: string | undefined
) => {
  try {
    const res = await fetch(`/api/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pollAddress,
        option,
        account,
      }),
    });
    const resp = await res.json();
    if (!res.ok) {
      console.error(resp.error);
      return { success: false, error: resp.error };
    }
    return { success: true, error: null };
  } catch (err: any) {
    console.error(err.stack);
    return { success: false, error: err.stack };
  }
};
