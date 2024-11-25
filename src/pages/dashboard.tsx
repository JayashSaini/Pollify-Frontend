import { useAuth } from "../context/auth.context";
import { IoMdMore } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Menu } from "@headlessui/react";
import { FaLongArrowAltDown, FaLongArrowAltUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Poll } from "../interfaces/poll";
import { requestHandler } from "../utils";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { createPollAPI, getMyPollsAPI } from "../api";
import Loader from "../components/Loader";
import Card from "../components/polls/card";
import CreatePollModal from "../components/polls/addPoll";

const Dashboard = () => {
  const { user } = useAuth();
  const [sortType, setSortType] = useState("oldest");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [polls, setPolls] = useState<Poll[]>([]);

  const { logout } = useAuth();

  const navigate = useNavigate();

  const toggleSortType = () => {
    if (polls.length == 0) {
      toast.error("No polls found.");
      return;
    }
    const newSortType = sortType === "latest" ? "oldest" : "latest";
    setSortType(newSortType);

    // Sort the array based on the new sort type
    const sortedPolls = [...polls].sort((a: Poll, b: Poll) => {
      if (newSortType === "latest") {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      } else {
        return (
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        );
      }
    });

    console.log("sorted sequence : ", sortedPolls);

    setPolls(sortedPolls); // Set the updated polls array
  };

  useEffect(() => {
    requestHandler(
      async () => await getMyPollsAPI(),
      setIsLoading,
      ({ data }) => {
        setPolls(data);
      },
      (e) => {
        toast.error(e);
        navigate("/");
      }
    );
  }, []);

  const onCreatePollHandler = ({
    title,
    options,
  }: {
    title: string;
    options: string[];
  }) => {
    requestHandler(
      async () => await createPollAPI({ title, options }),
      setIsLoading,
      ({ data }) => {
        polls.push(data);
        toast.success("Poll created successfully");
      },
      (e) => toast.error(e)
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="w-full  min-h-screen">
        <div className="w-full sm:px-12 px-3 py-12 custom-hero-bg flex justify-between items-start">
          <div>
            <h1 className="custom-font text-xl font-light">Dashboard</h1>
            <p className="poppins text-2xl font-semibold">
              Welcome,{" "}
              {user?.username ? capitalizeFirstLetter(user.username) : "Guest"}!
              Here are your polls:
            </p>
          </div>
          <div>
            {/* Dropdown Menu */}
            <Menu as="div" className="relative inline-block">
              <Menu.Button className="inline-flex items-center">
                <IoMdMore className="text-2xl text-white" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border-[1px] border-slate-300/50  backdrop-blur-md p-1  shadow-lg focus:outline-none space-y-1">
                {/* Menu Item - Logout */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-slate-100/20 text-white"
                          : " bg-slate-100/10 text-white"
                      } group flex w-full items-center gap-3 rounded-lg py-1.5 px-3`}
                      onClick={logout}
                    >
                      <RiLogoutBoxLine className="text-xl " />
                      Logout
                      <kbd className="ml-auto hidden font-sans text-xs text-gray-400 group-focus:inline">
                        ⌘E
                      </kbd>
                    </button>
                  )}
                </Menu.Item>

                {/* Add More Menu Items */}
              </Menu.Items>
            </Menu>
          </div>
        </div>
        <div className="w-full max-w-screen-xl m-auto">
          <div className="flex items-center justify-end sm:px-12 px-3 py-3 gap-3">
            <div className="w-[150px]">
              <Button
                size="small"
                fullWidth={true}
                onClick={() => setIsModalOpen(true)}
              >
                Create Poll
              </Button>
            </div>
            <Button onClick={toggleSortType} size="small" severity="secondary">
              {sortType == "latest" ? (
                <FaLongArrowAltUp />
              ) : (
                <FaLongArrowAltDown />
              )}
              SORT
            </Button>
          </div>
          <div className="w-full  sm:px-12 px-3 py-3 overflow-hidden">
            {polls.length === 0 ? (
              <div className="w-full h-[400px]   flex items-center justify-center">
                <p className="text-center text-lg font-semibold text-slate-800">
                  No polls found
                </p>
              </div>
            ) : (
              <div className=" max-h-[700px] h-auto overflow-y-auto  grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                {polls.map((poll, index) => (
                  <Card key={index} poll={poll} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <CreatePollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onCreatePollHandler}
      />
    </>
  );
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Dashboard;
