export function getElement(
  selector: string,
  parent: Element | Document = document,
): Element {
  const element = parent.querySelector(selector);
  if (!element) throw new Error(`${selector} was not found on ${parent}`);

  return element;
}

export function getAllElements(
  selector: string,
  parent: Element | Document = document,
): NodeListOf<Element> {
  const element = parent.querySelectorAll(selector);
  if (!element) throw new Error(`${selector} was not found on ${parent}`);

  return element;
}
