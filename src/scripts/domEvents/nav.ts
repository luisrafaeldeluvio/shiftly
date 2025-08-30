import { changeActivePanel } from "../changeActivePanel";
import { timerUIController } from "../timer-ui.ts";
import { getNavItems } from "../helpers/get-nav-items.ts";
import { getElement } from "../helpers/get-element.ts";

const nav = getElement(".nav > ul") as HTMLUListElement;

function handleNavState(elems: string[], currentElem: Element): void {
  elems.forEach((elem) => {
    const parentElem = getElement(`#${elem}`);

    getElement("span", parentElem).classList.add("hidden");

    if (elem === currentElem.id)
      getElement("span", currentElem).classList.remove("hidden");
  });
}

function handleTimerUIForNav(currentElem: Element): void {
  if (currentElem.id === "navhistory" && timerUIController.isTimerCollapsed) {
    timerUIController.collapse();
  } else if (timerUIController.isTimerCollapsed) {
    return;
  } else {
    timerUIController.collapse();
  }
}

export function handleNavClicks(elem: Element): void {
  const navItems = getNavItems(nav);
  const targetPanel = navItems[elem.id];

  changeActivePanel(targetPanel);
  handleNavState(Object.keys(navItems), elem);
  handleTimerUIForNav(elem);
}
