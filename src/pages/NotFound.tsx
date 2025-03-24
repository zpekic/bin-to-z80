
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full text-center space-y-6 animate-fade-in">
          <div className="mx-auto rounded-full bg-secondary p-6 w-24 h-24 flex items-center justify-center">
            <FileQuestion className="h-12 w-12 text-muted-foreground" />
          </div>
          
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-xl text-muted-foreground mb-4">
            This page doesn't exist
          </p>
          
          <Button asChild className="animate-slide-up">
            <a href="/">Return to Disassembler</a>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
