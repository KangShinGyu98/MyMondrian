import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/MyMondrian/", // GitHub Pages URL의 base path
  build: {
    outDir: "build", // 빌드 출력 디렉토리
  },
});
