export function maskWalletAddress(address: string): string {
  if (address.length <= 6) {
    // If the address is too short to mask, return it as is
    return address;
  }
  const start = address.slice(0, 3);
  const end = address.slice(-3);
  return `${start}**${end}`;
}
