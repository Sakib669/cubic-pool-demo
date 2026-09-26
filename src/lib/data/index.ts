import { LocalMockCmsAdapter } from "./mock-adapter";
import type { ICmsAdapter } from "./adapter";

export * from "./adapter";
export * from "./mock-adapter";
export * from "./mock";

// Singleton factory to retrieve the configured CMS adapter
let adapterInstance: ICmsAdapter | null = null;

export function getCmsAdapter(): ICmsAdapter {
  if (!adapterInstance) {
    // In future phases, if process.env.CMS_PROVIDER === 'remote', instantiate RemoteCmsAdapter
    adapterInstance = new LocalMockCmsAdapter();
  }
  return adapterInstance;
}

// Pre-instantiated singleton export for easy import in components and routes
export const cmsAdapter: ICmsAdapter = getCmsAdapter();
