import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

// Define the shape of your initial values
interface InitialValues {
  requisitionDetails: {
    gender: string;
    noOfOpenings: number;
    requisitionTitle: string;
    urgency: string;
  };
  jobDetails: {
    jobDetails: string;
    jobLocation: string;
    jobTitle: string;
  };
  interviewSettings: {
    interviewDuration: string;
    interviewLanguage: string;
    interviewMode: string;
  };
}

// Define the shape of your context value
interface DataContextValue {
  state: InitialValues;
  setState: Dispatch<SetStateAction<InitialValues>>;
  updateRequisitionDetails: (requisitionDetails: Partial<InitialValues["requisitionDetails"]>) => void;
  updateJobDetails: (jobDetails: Partial<InitialValues["jobDetails"]>) => void;
  updateInterviewSettings: (interviewSettings: Partial<InitialValues["interviewSettings"]>) => void;
}

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<DataContextValue | null>(null);

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  // Define the initial state
  const [state, setState] = useState<InitialValues>({
    requisitionDetails: {
      gender: "",
      noOfOpenings: 0,
      requisitionTitle: "",
      urgency: "",
    },
    jobDetails: {
      jobDetails: "",
      jobLocation: "",
      jobTitle: "",
    },
    interviewSettings: {
      interviewDuration: "",
      interviewLanguage: "",
      interviewMode: "",
    }
  });

  // Define the function to update requisition details
  const updateRequisitionDetails = (requisitionDetails: Partial<InitialValues["requisitionDetails"]>) => {
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: {
        ...prevState.requisitionDetails,
        ...requisitionDetails,
      },
      jobDetails: { ...prevState.jobDetails },
      interviewSettings: { ...prevState.interviewSettings },
    }));
  };

  const updateJobDetails = (jobDetails: Partial<InitialValues["jobDetails"]>) => {
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: { ...prevState.requisitionDetails },
      jobDetails: {
        ...prevState.jobDetails,
        ...jobDetails,
      },
      interviewSettings: { ...prevState.interviewSettings },
    }));
  };
  const updateInterviewSettings = (interviewSettings: Partial<InitialValues["interviewSettings"]>) => {
    setState((prevState) => ({
      ...prevState,
      requisitionDetails: { ...prevState.requisitionDetails },
      jobDetails: { ...prevState.jobDetails },
      interviewSettings: {
        ...prevState.interviewSettings,
        ...interviewSettings,
      },
    }));
  };

  // Create the context value
  const contextValue: DataContextValue = {
    state,
    setState,
    updateRequisitionDetails,
    updateJobDetails,
    updateInterviewSettings
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export default DataProvider;
