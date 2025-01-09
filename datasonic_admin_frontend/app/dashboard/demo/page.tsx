'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AlertCircle, FileAudio, Upload } from 'lucide-react'
import './demo.css'

type APIResponse = {
  DeepFake: {
    predicted_label: string
    average_confidence: number
  }
  Panic: {
    panic_rating: string
    panic_level: string
    reasoning: string
  }
  Transcript: Array<{
    timestamp: string
    speaker: string
    text: string
    prediction?: {
      label: string
      score: number
    }
  }>
  AI_Output: string
}

export default function DemoPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedSample, setSelectedSample] = useState<string>('')
  const [apiResponse, setApiResponse] = useState<APIResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const sampleAudios = [
    { name: 'Sample 1', value: 'sample1.mp3' },
    { name: 'Sample 2', value: 'sample2.mp3' },
    { name: 'Sample 3', value: 'sample3.mp3' },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setSelectedSample('')
    }
  }

  const handleSampleChange = (value: string) => {
    setSelectedSample(value)
    setSelectedFile(null)
  }

  // Global variable for base_url
const base_url = "http://127.0.0.1:7860/api/v1"

// Handle form submission
const handleSubmit = async () => {
  setIsLoading(true)
  setApiResponse(null)

  try {
    // Step 1: Upload the file
    let uploadedFilePath = await uploadFile(selectedFile)

    // Step 2: Send the prompt and uploaded file to the API
    let result = await sendPrompt(uploadedFilePath)

    // Step 3: Process the response
    console.log("Processed API Response:", result) // Log the simplified response
    setApiResponse(result)

  } catch (error) {
    console.error("Error:", error) // Log any errors here
  } finally {
    setIsLoading(false)
  }
}

// Upload file function
const uploadFile = async (file: File | null) => {
  if (!file) throw new Error("No file selected")

  const formData = new FormData()
  formData.append('file', file)

  const url = `${base_url}/files/upload/94d56935-cd34-481c-98c0-8d4117725d0b`
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Error uploading file: ${response.statusText}`)
  }

  const data = await response.json()
  console.log("File Upload Response:", data) // Log the file upload response for debugging
  return data?.uploaded_file_path // Assuming the API returns the file path in this field
}

// Send prompt function
const sendPrompt = async (uploadedFilePath: string) => {
  const url = `${base_url}/run/94d56935-cd34-481c-98c0-8d4117725d0b?stream=false`
  const payload = {
    output_type: 'chat',
    input_type: 'chat',
    tweaks: {
      "CustomComponent-bXFXp": {
        audio_file: uploadedFilePath,
      },
    },
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`)
  }

  const data = await response.json()
  console.log("Prompt API Raw Response:", data) // Log the raw API response for debugging
    // Extract and return the required text data
  // Assuming 'text' contains JSON string, we parse it to an object
  const resultText = data["outputs"][0]["outputs"][0]["results"]["message"]["data"]["text"]
  const result: APIResponse = JSON.parse(resultText) // Convert the string to an object
  return result // Return the structured APIResponse object

}

  

  const getPanicEmoji = (panicRating: number) => {
    if (panicRating <= 20) return '😊'
    if (panicRating <= 40) return '😐'
    if (panicRating <= 60) return '😟'
    if (panicRating <= 80) return '😨'
    return '😱'
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Vishing Detection Demo</h1>
      
      <Card className="mb-6 overflow-hidden gradient-border card-hover">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileAudio className="w-6 h-6" />
            Upload or Select Audio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="audio-upload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Audio File
            </label>
            <div className="flex items-center space-x-2">
              <input
                id="audio-upload"
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="audio-upload"
                className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Upload className="mr-2 h-5 w-5" />
                Choose File
              </label>
              <span className="text-sm text-gray-500">
                {selectedFile ? selectedFile.name : 'No file chosen'}
              </span>
            </div>
          </div>
          
          <div>
            <label htmlFor="sample-select" className="block text-sm font-medium text-gray-700 mb-2">
              Or Select Sample Audio
            </label>
            <Select onValueChange={handleSampleChange} value={selectedSample}>
              <SelectTrigger id="sample-select">
                <SelectValue placeholder="Select a sample audio" />
              </SelectTrigger>
              <SelectContent>
                {sampleAudios.map((sample) => (
                  <SelectItem key={sample.value} value={sample.value}>
                    {sample.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleSubmit} 
            disabled={isLoading || (!selectedFile && !selectedSample)}
            className="w-full"
          >
            {isLoading ? 'Processing...' : 'Analyze Audio'}
          </Button>
        </CardContent>
      </Card>
      
      {apiResponse && (
        <div className="space-y-6">
          <Card className="gradient-border card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-500" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">DeepFake Detection</h3>
                  <p className="text-sm text-gray-500">Predicted Label: {apiResponse.DeepFake.predicted_label}</p>
                </div>
                <div className="text-2xl font-bold text-red-500">
                  {(apiResponse.DeepFake.average_confidence * 100).toFixed(2)}%
                </div>
              </div>
              <Progress value={apiResponse.DeepFake.average_confidence * 100} className="h-2" />
              
              <div className="flex justify-between items-center mt-4">
                <div>
                  <h3 className="text-lg font-semibold">Panic Level</h3>
                  <p className="text-sm text-gray-500">{apiResponse.Panic.panic_level}</p>
                </div>
                <div className="text-4xl">
                  {getPanicEmoji(parseInt(apiResponse.Panic.panic_rating))}
                </div>
              </div>
              <Progress value={parseInt(apiResponse.Panic.panic_rating)} className="h-2" />
              
              <p className="text-sm mt-2 text-justify">{apiResponse.Panic.reasoning}</p>
            </CardContent>
          </Card>
          
          <Card className="gradient-border card-hover">
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {apiResponse.AI_Output.split('\n\n').map((paragraph, index) => (
                <div key={index} className="mb-4" dangerouslySetInnerHTML={{
                    __html: paragraph
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<li>$1</li>')
                        .replace(/\n/g, '<br />')
                    }} />
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="gradient-border card-hover">
            <CardHeader>
              <CardTitle>Conversation Transcript</CardTitle>
            </CardHeader>
            <CardContent>
            <TooltipProvider>
                {apiResponse.Transcript.map((entry, index) => {
                  const isHighlighted = entry.prediction?.label === "Scam" || (entry.prediction?.label === "Safe" && entry.prediction.score < 0.8);
                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div 
                          className={`p-3 rounded-lg ${
                            isHighlighted ? 'bg-red-100' : 'bg-gray-100'
                          }`}
                        >
                          <p className="text-sm text-gray-500">{entry.timestamp} - {entry.speaker}</p>
                          <p className="mt-1">{entry.text}</p>
                          {entry.prediction && (
                            <p className="text-sm text-gray-500 mt-1">
                              Prediction: {entry.prediction.label} (Confidence: {(entry.prediction.score * 100).toFixed(2)}%)
                            </p>
                          )}
                        </div>
                      </TooltipTrigger>
                      {isHighlighted && (
                        <TooltipContent>
                          <p>This section is highlighted due to potential scam indicators or low confidence in safety prediction.</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

