import k from "./kaplay";
import "kaplay/global";

const session = await (window as any).ai.createGenericSession();

globalThis.session = session;

const qtext = k.add([
  text("mortal what is your question?"),
  pos(width() / 2, 0),
  anchor("top"),
]);
k.loadBean();
k.add([sprite("bean"), pos(qtext.pos.x - qtext.width / 2 - 70, qtext.pos.y)]);
const question = k.add([
  text("", {
    width: width(),
    align: "center",
    styles: {
      "0": { color: new k.Color(0, 0, 0) },
      "1": { color: new k.Color(0, 0, 170) },
      "2": { color: new k.Color(0, 170, 0) },
      "3": { color: new k.Color(0, 170, 170) },
      "4": { color: new k.Color(170, 0, 0) },
      "5": { color: new k.Color(170, 0, 170) },
      "6": { color: new k.Color(255, 170, 0) },
      "7": { color: new k.Color(170, 170, 170) },
      "8": { color: new k.Color(85, 85, 85) },
      "9": { color: new k.Color(85, 85, 255) },
    },
  }),
  textInput(),
  pos(width() / 2, height() / 2),
  anchor("center"),
]);

let infoTex = { val: "press enter to send query" };

const info = k.add([
  text("press enter to send query", {
    width: width(),
    align: "center",
    styles: {
      "0": { color: new k.Color(0, 0, 0) },
      "1": { color: new k.Color(0, 0, 170) },
      "2": { color: new k.Color(0, 170, 0) },
      "3": { color: new k.Color(0, 170, 170) },
      "4": { color: new k.Color(170, 0, 0) },
      "5": { color: new k.Color(170, 0, 170) },
      "6": { color: new k.Color(255, 170, 0) },
      "7": { color: new k.Color(170, 170, 170) },
      "8": { color: new k.Color(85, 85, 85) },
      "9": { color: new k.Color(85, 85, 255) },
    },
  }),
  pos(width() / 2, height()),
  anchor("bot"),
  {
    update() {
      this.text = infoTex.val;
    },
  },
]);

k.onKeyPress("enter", async () => {
  addKaboom(k.vec2(info.pos.x, info.pos.y - info.height / 2));
  infoTex.val = "loading...";
  infoTex.val = await session.execute(question.text);
  addKaboom(k.vec2(info.pos.x, info.pos.y - info.height / 2));
});
