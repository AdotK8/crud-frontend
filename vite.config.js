import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.MAP_KEY": JSON.stringify(env.MAP_KEY),
      "process.env.REACT_APP_PW": JSON.stringify(env.REACT_APP_PW),
    },
    plugins: [react()],
  };
});
