export function parseId(id: string | string[] | undefined) {
  return +(id as string).toString();
}
