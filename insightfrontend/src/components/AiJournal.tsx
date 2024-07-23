import { useRecoilState } from "recoil";
import { Button } from "../components/ui/button";
import { loadingState } from "@/atoms";


interface AiJournalProps {
    setAi: React.Dispatch<React.SetStateAction<boolean>>;
    onInsightAdd: React.Dispatch<React.SetStateAction<string>>;
    journalText: string;
  }

const AiJournal: React.FC<AiJournalProps> = ({
    setAi,
    onInsightAdd,
    journalText,
  })=>{
    const [isLoading,setisLoadingState] = useRecoilState(loadingState)
    return (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          id="my-modal"
        >
          <div className="relative top-20 mx-auto p-5 border shadow-lg rounded-md bg-[#E0E0E0] w-full max-w-4xl">
            <div className="mt-3 text-center">
              {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <Image
                //   src={logo}
                //   alt="meditate"
                //   width="48"
                //   height="48"
                //   className="rounded-full"
                // />
              </div> */}
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                AI Insights
              </h3>
              <div className="mt-2 px-7 py-3">
                    <label htmlFor="dayjournal">Describe your day here</label>
                    <textarea
                      name="dayjournal"
                      placeholder="Describe your day here"
                      className="border border-gray-300 rounded-md p-2 mt-2 w-full resize-none"
                    //   onChange={handleJournalChange}
                    //   value={aiJournalEntry}
                    ></textarea>
                    <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3">
                    <Button
                    //   onClick={() => setAiJournalEntry(journalText)}
                      className="mt-2"
                    >
                      Use Journal Text
                    </Button>
                      <Button
                        className="mx-auto mb-2 sm:mb-0"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Loading...
                          </div>
                        ) : (
                          "Generate Insightful Journal"
                        )}
                      </Button>
                      <Button className="mx-auto" onClick={() => setAi(false)}>
                        Close
                      </Button>
                    </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default AiJournal;