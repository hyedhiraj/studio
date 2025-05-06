
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function AISearchPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl flex items-center justify-center">
          <Search className="h-8 w-8 mr-2 text-accent" />
          AI Search
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Search through vectorized documents and knowledge base.
        </p>
      </header>
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle>AI Search (Coming Soon)</CardTitle>
          <CardDescription>
            This feature will allow you to perform semantic searches across your uploaded Kaizen documents and a general Kaizen knowledge base.
            The documents will be vectorized using Azure OpenAI models for efficient and relevant search results.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Imagine asking questions like "Show me all documents related to reducing waste in manufacturing" or "What are the best practices for implementing 5S in a small team?"
            and getting precise answers and document excerpts.
          </p>
          <div className="mt-6 flex justify-center">
            <img 
              data-ai-hint="database search"
              src="https://picsum.photos/seed/aisearch/400/250" 
              alt="AI Search Illustration" 
              className="rounded-lg shadow-md"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
