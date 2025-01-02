import {extend} from "flarum/common/extend";
import app from "flarum/forum/app";
import CommentPost from "flarum/forum/components/CommentPost";
import DiscussionPage from "flarum/forum/components/DiscussionPage";
import DiscussionControls from "flarum/forum/utils/DiscussionControls";
import LogInModal from "flarum/forum/components/LogInModal";
import TextEditor from "flarum/common/components/TextEditor";
import TextEditorButton from "flarum/common/components/TextEditorButton";

app.initializers.add("flarum/bbcode", () => {
  extend(TextEditor.prototype, "toolbarItems", function (items) {
    items.add(
      "empty-two-squares",
      <TextEditorButton
        onclick={() => {
          this.attrs.composer.editor.insertAtCursor("[ETS][/ETS]");
          const range = this.attrs.composer.editor.getSelectionRange();
          this.attrs.composer.editor.moveCursorTo(range[1] - 6);
        }}
        icon="fa fa-comment-medical"
      >
        {app.translator.trans("flarum-bbcode.forum.button_empty_two_squares")}
      </TextEditorButton>
    )
    items.add(
      "reply-to-see",
      <TextEditorButton
        onclick={() => {
          this.attrs.composer.editor.insertAtCursor("[REPLY][/REPLY]");
          const range = this.attrs.composer.editor.getSelectionRange();
          this.attrs.composer.editor.moveCursorTo(range[1] - 8);
        }}
        icon="fa fa-comment-medical"
      >
        {app.translator.trans("flarum-bbcode.forum.button_reply_tooltip")}
      </TextEditorButton>
    )
    items.add(
      "timeline-icon",
      <TextEditorButton
        onclick={() => {
          this.attrs.composer.editor.insertAtCursor("[TLI=tag 标题]内容[/TLI]");
          const range = this.attrs.composer.editor.getSelectionRange();
          this.attrs.composer.editor.moveCursorTo(range[1] - 8);
        }}
        icon="fa fa-comment-medical"
      >
        {app.translator.trans("flarum-bbcode.forum.button_timeline1_tooltip")}
      </TextEditorButton>
    )
    items.add(
      "timeline-color",
      <TextEditorButton
        onclick={() => {
          this.attrs.composer.editor.insertAtCursor("[TLC=#4d698e 标题]内容[/TLC]");
          const range = this.attrs.composer.editor.getSelectionRange();
          this.attrs.composer.editor.moveCursorTo(range[1] - 8);
        }}
        icon="fa fa-comment-medical"
      >
        {app.translator.trans("flarum-bbcode.forum.button_timeline2_tooltip")}
      </TextEditorButton>
    )

  })

  extend(CommentPost.prototype, "content", function () {
    if (app.session.user && app.current.matches(DiscussionPage)) {
      this.$(".reply2see_reply")
        .off("click")
        .on("click", () =>
          DiscussionControls.replyAction.call(
            app.current.get("discussion"),
            true,
            false
          )
        );
    } else {
      this.$(".reply2see_reply")
        .off("click")
        .on("click", () => app.modal.show(LogInModal));
    }
  })
})
