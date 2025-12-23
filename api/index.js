export default async (req, res) => {
  const { reqHandler } = await import('../dist/ng-signal-forms-lab/server/server.mjs');
  return reqHandler(req, res);
};