import { on, showUI } from "@create-figma-plugin/utilities";

export default function () {
  showUI({
    width: 300,
    height: 400,
  });

  function handleSubmit(
      data: {
          name: string,
          svg: string,
          outlineStroke: boolean,
          createComponent: boolean,
      }
  ) {
    const icon = figma.createNodeFromSvg(data.svg);

    icon.name = `tabler-icon-${data.name}`;
    icon.x = Math.round(figma.viewport.center.x);
    icon.y = Math.round(figma.viewport.center.y);

    const flattened = figma.flatten(icon.children, icon);

    if (data.outlineStroke) {
      const stroke = flattened.outlineStroke();

      if (stroke) {
        flattened.remove();
        icon.appendChild(stroke);
      }
    }

    if (data.createComponent) {
        const comp = figma.createComponentFromNode(icon);
        figma.currentPage.selection = [comp];
    } else {
        figma.currentPage.selection = [icon];
    }
  }

  on("SUBMIT", handleSubmit);
}
