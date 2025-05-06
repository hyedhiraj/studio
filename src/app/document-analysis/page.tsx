"use client";

import { analyzeKaizenDocument, type AnalyzeKaizenDocumentOutput } from "@/ai/flows/analyze-kaizen-document";
import { generateKaizenRoadmap, type GenerateKaizenRoadmapOutput } from "@/ai/flows/generate-kaizen-roadmap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, UploadCloud, Loader2, Rocket, Brain } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";

export default function DocumentAnalysisPage() {
  const [file, setFile] = useState<File | null>(null);
  const [userGoals, setUserGoals] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AnalyzeKaizenDocumentOutput | null>(null);
  const [roadmap, setRoadmap] = useState<GenerateKaizenRoadmapOutput | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      // Basic validation for PDF and text files for example
      if (selectedFile.type === "application/pdf" || selectedFile.type.startsWith("text/")) {
        setFile(selectedFile);
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF or text file.",
          variant: "destructive",
        });
        setFile(null);
        event.target.value = ""; // Reset file input
      }
    }
  };

  const handleAnalyzeDocument = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a document to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setRoadmap(null); 

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const documentDataUri = reader.result as string;
        const output = await analyzeKaizenDocument({ documentDataUri });
        setAnalysisResult(output);
        toast({
          title: "Analysis Complete",
          description: "Document analyzed successfully. Key insights extracted.",
        });
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        toast({
          title: "File Read Error",
          description: "Could not read the selected file.",
          variant: "destructive",
        });
         setIsAnalyzing(false);
      };
    } catch (error) {
      console.error("Error analyzing document:", error);
      toast({
        title: "Analysis Failed",
        description: "An error occurred during document analysis.",
        variant: "destructive",
      });
    } finally {
      // Delay setting isAnalyzing to false to allow onload to complete if successful
      // This is a simplification; in a real app, manage state more robustly
      setTimeout(() => setIsAnalyzing(false), 500);
    }
  };

  const handleGenerateRoadmap = async (event: FormEvent) => {
    event.preventDefault();
    if (!analysisResult || !userGoals.trim()) {
      toast({
        title: "Missing Information",
        description: "Please analyze a document and provide your goals before generating a roadmap.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingRoadmap(true);
    setRoadmap(null);

    try {
      const analysisSummary = `Areas for Improvement: ${analysisResult.areasForImprovement.join(", ")}. Key Insights: ${analysisResult.keyInsights.join(", ")}`;
      const output = await generateKaizenRoadmap({
        analysisResults: analysisSummary,
        userGoals,
      });
      setRoadmap(output);
      toast({
        title: "Roadmap Generated",
        description: "Kaizen implementation roadmap created successfully.",
      });
    } catch (error) {
      console.error("Error generating roadmap:", error);
      toast({
        title: "Roadmap Generation Failed",
        description: "An error occurred while generating the roadmap.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl flex items-center justify-center">
          <FileText className="h-8 w-8 mr-2 text-accent" />
          Kaizen Document Analysis
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Upload your documents to extract insights and generate actionable Kaizen roadmaps.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UploadCloud className="h-6 w-6 mr-2 text-accent" />
              Upload &amp; Analyze Document
            </CardTitle>
            <CardDescription>
              Select a document (PDF, TXT) and let AI identify improvement areas and key insights.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="kaizen-document">Select Document</Label>
              <Input id="kaizen-document" type="file" onChange={handleFileChange} accept=".pdf,.txt,.md" />
              {file && <p className="text-sm text-muted-foreground mt-2">Selected: {file.name}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAnalyzeDocument} disabled={!file || isAnalyzing} className="w-full">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                </>
              ) : (
                "Analyze Document"
              )}
            </Button>
          </CardFooter>
        </Card>

        {analysisResult && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-6 w-6 mr-2 text-accent" />
                Analysis Insights
              </CardTitle>
              <CardDescription>Key findings from your document.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-foreground">Areas for Improvement:</h4>
                    <ul className="list-disc list-inside text-muted-foreground text-sm">
                      {analysisResult.areasForImprovement.map((item, index) => (
                        <li key={`improvement-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Key Insights:</h4>
                    <ul className="list-disc list-inside text-muted-foreground text-sm">
                      {analysisResult.keyInsights.map((item, index) => (
                        <li key={`insight-${index}`}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>

      {analysisResult && (
        <>
          <Separator className="my-8" />
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Rocket className="h-6 w-6 mr-2 text-accent" />
                Generate Kaizen Roadmap
              </CardTitle>
              <CardDescription>
                Based on the analysis, define your goals and generate a step-by-step implementation roadmap.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleGenerateRoadmap}>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="user-goals">Your Goals</Label>
                  <Textarea
                    id="user-goals"
                    placeholder="e.g., Reduce production cycle time by 15%, Improve team collaboration on process documentation..."
                    value={userGoals}
                    onChange={(e) => setUserGoals(e.target.value)}
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isGeneratingRoadmap || !userGoals.trim()} className="w-full">
                  {isGeneratingRoadmap ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Roadmap...
                    </>
                  ) : (
                    "Generate Roadmap"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </>
      )}

      {roadmap && (
         <>
          <Separator className="my-8" />
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Your Kaizen Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{roadmap.roadmap}</p>
              </ScrollArea>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
