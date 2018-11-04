export const validGameCodeRegexp = /^[a-z0-9]{4}$/;

export function gameCodeValid(gameCode) {
  return gameCode != null && gameCode !== 'null' && gameCode.match(validGameCodeRegexp);
}

export function playerNameValid(playerName) {
  return playerName != null && playerName !== 'null' && playerName.length > 4;
}
