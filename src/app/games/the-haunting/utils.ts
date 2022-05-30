export function openDialog(dialog, ref) {
  dialog.open(ref);
}

export function iterateObject(obj) {
  return [...Object.keys(obj).map((key) => obj[key])];
}
export function bold(val) {
  return "<b>" + val + "</b>";
}

export function removeInspect(game, inspect) {
  game.world[game.user.worldPoint.name].inspects = game.world[
    game.user.worldPoint.name
  ].inspects.filter((i) => i.name !== inspect.name);
  game.user.worldPoint.inspects = game.user.worldPoint.inspects.filter(
    (i) => i.name !== inspect.name
  );
  return game;
}

export function randomId() {
  return Math.floor(Math.random() * 100000);
}

export function onAction(type, game, inspect, accessed) {
  switch (type) {
    case type.includes("pickup"):
      if (accessed) {
        inspect.item
          ? (game.user.bag.push(inspect.item),
            (game.user.acceptMessage += `<br><br> You found  ${bold(
              inspect.item.name
            )}`))
          : (game = removeInspect(game, inspect));
        return game;
      } else {
        return game;
      }

      break;
    case type.includes("event"):
      break;

    case type.includes("event"):
      break;

    default:
      break;
  }
}
