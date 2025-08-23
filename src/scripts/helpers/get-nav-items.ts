import { getAllElements } from "./get-element";

export function getNavItems(navElement: HTMLElement) {
  const panelsList = getAllElements(".panel");
  const panelsNavRecord: Record<string, string> = {};

  if (!navElement.childElementCount)
    throw new Error(`${navElement} does not have children`);

  if (panelsList.length !== navElement.childElementCount)
    throw new Error(
      `Panels(${panelsList.length}) and nav items(${navElement.childElementCount}) amount do not match`,
    );

  Array.from(panelsList).map((panel, index) => {
    if (!panel.id) throw new Error(`${panel} has no ID`);

    const item = navElement.children[index];
    panelsNavRecord[item.id] = panel.id;
  });

  return panelsNavRecord;
}
