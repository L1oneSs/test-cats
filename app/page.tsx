"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CatGrid } from "./components/CatGrid";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen">
        <Tabs
          defaultValue="all"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="w-full px-20 h-16 flex md:justify-start bg-blue-400 text-white">
            <TabsTrigger
              value="all"
              className="flex-1 h-full max-w-[200px] data-[state=active]:bg-blue-500"
            >
              Все котики
            </TabsTrigger>
            <TabsTrigger
              value="favorites"
              className="flex-1 h-full max-w-[200px] data-[state=active]:bg-blue-500"
            >
              Любимые котики
            </TabsTrigger>
          </TabsList>

          <div className="p-10">
            <TabsContent value="all">
              <CatGrid showFavorites={false} />
            </TabsContent>
            <TabsContent value="favorites">
              <CatGrid showFavorites={true} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </QueryClientProvider>
  );
}
