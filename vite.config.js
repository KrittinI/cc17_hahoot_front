import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // ใช้ '0.0.0.0' เพื่อให้สามารถเข้าถึงได้จากทุกที่ในเครือข่าย
    port: 3000, // เลือกพอร์ตที่ต้องการ
    hmr: {
      host: "localhost",
    },
  },
});
