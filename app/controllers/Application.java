package controllers;

import play.Logger;
import play.libs.F;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.WebSocket;
import views.html.index;

public class Application extends Controller {

    public static Result index() {
        return ok(index.render());
    }

    public static Result index2() {
        sockHandler();
        return ok();
    }

    public static WebSocket<String> sockHandler() {
        return new WebSocket<String>() {
            // called when the websocket is established
            public void onReady(WebSocket.In<String> in, WebSocket.Out<String> out) {
                // register a callback for processing instream events
                in.onMessage(new F.Callback<String>() {
                    public void invoke(String event) {
                        Logger.info(event);
                    }
                });

                // write out a greeting
                out.write("I'm contacting you regarding your recent websocket.");
            }
        };
    }
}
