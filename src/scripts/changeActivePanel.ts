const panelsList = document.querySelectorAll(".panel");

const panelsId: string[] = [];
for (const panel of panelsList) {
  panelsId.push(panel.id);
}

export function changeActivePanel(id: string): void {
  if (!panelsId.includes(id)) return;

  panelsId.forEach((panelId) => {
    const panel = document.querySelector(`#${panelId}`);
    if (!panel) return;

    if (panelId !== id) {
      panel.classList.remove("panel--active");
    } else {
      panel.classList.add("panel--active");
    }
  });
}
