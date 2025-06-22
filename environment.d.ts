declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: number;
    }
  }
}

// convert this to a module
export { };
