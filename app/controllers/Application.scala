package controllers

import play.api._
import play.api.mvc._
import play.api.Play.current
import play.api.libs.ws._
import play.api.libs.ws.ning.NingAsyncHttpClientConfigBuilder
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

object Application extends Controller {

  def index = Action {
    Ok(views.html.index("What's the title??!"))
  }

  def crawl(url: String) = Action.async { implicit request =>

    WS.url(url).get.map {response => 
      val body = response.body
      val lowercase = body.toLowerCase
      val start = lowercase.indexOfSlice("<title>") + "<title>".length
      val end = lowercase.indexOfSlice("</title>")
      val title = body.slice(start,end)
      println(s"title is from $start to $end which is '$title'")
      val explanation = if("" == title) s"Uh Oh! $url has no <title>" else s"The <title> of $url is '$title'"
      Ok(explanation)
    }
  }
}