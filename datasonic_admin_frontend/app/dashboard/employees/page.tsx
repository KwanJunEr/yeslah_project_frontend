"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";

// Define the departments
interface Department {
  name: string;
  description: string;
}

interface PromptPageProps {
  department: string;
  onBack: () => void;
}

const departments: Department[] = [
  {
    name: "IT",
    description:
      "Learn how to protect systems from vishing and smishing threats.",
  },
  {
    name: "HR",
    description:
      "Handle phishing attempts targeting employee records or recruitment.",
  },
  {
    name: "Sales",
    description: "Identify fake client communications and invoice scams.",
  },
  {
    name: "Finance",
    description: "Avoid fraudulent payment requests and phishing emails.",
  },
  {
    name: "Marketing",
    description: "Recognize fake partnership offers and social media phishing.",
  },
];

// Home Page Component
const HomePage: React.FC<{
  onSelectDepartment: (department: string) => void;
}> = ({ onSelectDepartment }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Employee Training</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {departments.map((department) => (
          <div
            key={department.name}
            className="card border p-4 rounded shadow hover:bg-blue-100 cursor-pointer"
            onClick={() => onSelectDepartment(department.name)}
          >
            <h2 className="text-xl font-semibold">{department.name}</h2>
            <p>{department.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mock API Call
const mockLangflowApi = async (userInput: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        confidenceScore: Math.random() * 100, // Random confidence score for demonstration
        panicScore: Math.random() * 100, // Random panic score for demonstration
      });
    }, 1000);
  });
};

// Prompt Page Component
interface PromptPageProps {
  department: string;
  onBack: () => void;
}

const PromptPage: React.FC<PromptPageProps> = ({ department, onBack }) => {
  const [scenario, setScenario] = useState<"attacking" | "defensive" | null>(
    null
  );
  const [userInput, setUserInput] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    confidenceScore: number;
    panicScore: number;
  } | null>(null);
  const [scamTextClass, setScamTextClass] = useState<string>(""); // For dropdown selection
  const [classConfidence, setClassConfidence] = useState<string>(""); // For confidence input

  const handleScenarioSelect = (
    selectedScenario: "attacking" | "defensive"
  ) => {
    setScenario(selectedScenario);
    setUserInput("");
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    setIsSubmitting(true);
    setResult(null);

    try {
      const apiResponse = await mockLangflowApi(userInput);
      setResult(apiResponse as { confidenceScore: number; panicScore: number });
    } catch (error) {
      console.error("Error fetching API response:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{department} Training</h1>
        <Button variant="outline" onClick={onBack}>
          Back to Departments
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Training Scenarios</CardTitle>
          <CardDescription>
            This is a training module for the <strong>{department}</strong>{" "}
            department. Choose a scenario below to begin your training.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button
              variant={scenario === "attacking" ? "default" : "outline"}
              onClick={() => handleScenarioSelect("attacking")}
            >
              Attacking Scenario
            </Button>
            <Button
              variant={scenario === "defensive" ? "default" : "outline"}
              onClick={() => handleScenarioSelect("defensive")}
            >
              Defensive Scenario
            </Button>
          </div>

          {scenario === "attacking" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Attacking Scenario</CardTitle>
                <CardDescription>
                  Pretend to be a scammer and craft a message or prompt that
                  might trick the Langflow model for educational purpose
                </CardDescription>
              </CardHeader>
              <CardContent>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your attacking prompt here..."
                  className="w-full border p-2 rounded mb-4"
                  rows={4}
                ></textarea>
                <Button
                  onClick={handleSubmit}
                  disabled={!userInput.trim() || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Attacking Prompt"}
                </Button>
                {result && (
                  <div className="mt-4 p-4 border rounded bg-gray-50">
                    <h3 className="text-lg font-semibold">Analysis Result</h3>
                    <p>
                      <strong>Confidence Score:</strong>{" "}
                      {result.confidenceScore.toFixed(2)}%
                    </p>
                    <p className="mt-2">
                      <strong>Justification:</strong> The confidence score
                      reflects how realistic and convincing the crafted scam
                      message is. A higher score indicates that the prompt
                      closely matches typical phishing attempts that have been
                      flagged by the model. Factors like urgency, emotional
                      manipulation, and use of technical jargon contributed to
                      this score.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {scenario === "defensive" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Defensive Scenario</CardTitle>
                <CardDescription>
                  Identify the class for the prompt below. Then provide a response
                  assuming this is a real phone call to {department} department.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border p-4 rounded bg-gray-100 mb-4">
                  <strong>Scam Call Text:</strong> "This is an urgent call from
                  your bank. Please provide your account details immediately to
                  avoid account suspension."
                </div>
                <div className="flex gap-4 mb-4 items-center">
                  <select
                    className="border p-2 rounded"
                    value={scamTextClass}
                    onChange={(e) => setScamTextClass(e.target.value)}
                  >
                    <option value="">Select Class</option>
                    <option value="scam">Scam</option>
                    <option value="non-scam">Non-Scam</option>
                  </select>
                </div>
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full border p-2 rounded mb-4"
                  rows={4}
                ></textarea>
                <Button
                  onClick={handleSubmit}
                  disabled={!userInput.trim() || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Defensive Response"}
                </Button>
                {result && (
                  <>
                    <div className="mt-4 p-4 border rounded bg-gray-50">
                      <h3 className="text-lg font-semibold">Analysis Result</h3>
                      <p>
                        <strong>Panic Score:</strong>{" "}
                        {result.panicScore.toFixed(2)}%
                      </p>
                      <p className="mt-2">
                        <strong>Justification:</strong> The panic score
                        represents how emotionally distressing this message
                        might be to a receiver. Higher scores are attributed to
                        messages that include threatening language, urgency, or
                        references to severe consequences like account
                        suspension.
                      </p>
                    </div>
                    <div className="mt-4 p-4 border rounded bg-gray-50">
                      <h3 className="text-lg font-semibold">Actual Analysis</h3>
                      <p>
                        <strong>Actual Class:</strong> Scam
                      </p>
                      <p>
                        <strong>Justification:</strong> This message is
                        classified as a scam because it uses high-pressure
                        language ("urgent call," "immediately") to manipulate
                        the recipient into providing sensitive information.
                        These tactics are common in phishing attempts.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const HomePage = () => (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Employee Training</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["IT", "HR", "Sales", "Finance", "Marketing"].map((department) => (
          <Card
            key={department}
            className="cursor-pointer hover:shadow-md transition"
            onClick={() => setSelectedDepartment(department)}
          >
            <CardHeader>
              <CardTitle>{department}</CardTitle>
              <CardDescription>
                Training tailored for the {department} department to handle
                vishing and smishing.
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {!selectedDepartment ? (
        <HomePage />
      ) : (
        <PromptPage
          department={selectedDepartment}
          onBack={() => setSelectedDepartment(null)}
        />
      )}
    </div>
  );
};

export default App;
