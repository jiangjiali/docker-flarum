import CopyButton from "./components/CopyButton";
import { extend } from "flarum/common/extend";
import app from "flarum/forum/app";
import CommentPost from "flarum/forum/components/CommentPost";

app.initializers.add("flarum/clipboard", () => {
  extend(CommentPost.prototype, "oncreate", function () {
    // @ts-ignore
    for (const el of this.element.querySelectorAll("pre")) {
      const container = document.createElement("div");
      container.classList.add("CopyCodeToClipboard");
      el.append(container);
      m.mount(container, CopyButton);
    }
  });
});
