import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { FavoriteProvider } from "./favorites/contexts/FavoriteContext";
import { MainRoutes } from "./routes";

const queryClient = new QueryClient(
  //   {
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 5000,
  //       cacheTime: 1000 * 60 * 60 * 15,
  //       retry: 10,
  //       retryDelay: 1000,
  //       refetchOnWindowFocus: true,
  //     }
  //   }
  // }
)

const App: React.FC = () => {
  return (
    <>

      <QueryClientProvider client={queryClient}>
        <FavoriteProvider>
          <Router>
            <MainRoutes />
          </Router>
        </FavoriteProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default App;
