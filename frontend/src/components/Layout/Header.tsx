import { Link } from "react-router-dom";
import dPollLogo from "../../assets/poll.png";
import AccountMenu from "../Auth/AccountMenu";

export default function Header() {
  return (
    <header className="sticky top-0 w-full z-10 bg-white items-center flex h-[60px] border-b border-gray-30 border-b-2 px-4">
      <div className="w-full">
        <Link to="/" className="flex items-center">
          <img src={dPollLogo} className="w-[40px] mr-4" />
          <h1 className="text-xl font-bold">dPoll</h1>
        </Link>
      </div>
      <AccountMenu />
    </header>
  );
}
