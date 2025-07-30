const nav = document.querySelector(".nav") as HTMLDivElement;
const navList = nav.querySelector("ul") as HTMLUListElement;
const navSlider = nav.querySelector(".nav__slider") as HTMLDivElement;

export function updateNavSliderPosition(id: string): void {
  const listWidth: Record<string, number> = {};
  for (const item of navList.children) {
    if (item.tagName === "DIV") continue;
    listWidth[item.id] = item.clientWidth;
  }

  if (!(id in listWidth)) {
    throw new Error(`"${id}" not found in ${Object.keys(listWidth)}`);
  }

  const selectedNavItem = document.querySelector(`#${id}`) as HTMLLIElement;
  const offset =
    selectedNavItem.getBoundingClientRect().left -
    navList.getBoundingClientRect().left;

  navSlider.style.transform = `translateX(calc(${offset}px - 1.4rem))`;
  navSlider.style.width = `calc( ${listWidth[id]}px + 2.5rem)`;
}
