import { Optional, None, Some } from 'scalike';

function ensure(name: string): Optional<string> {
  const environmentVariable = import.meta.env[name];
  return environmentVariable ? Some(environmentVariable) : None;
}

export const API_URL = ensure('VITE_API_URL');