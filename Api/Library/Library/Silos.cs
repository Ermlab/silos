using System;
using System.Net;
using System.IO;
using System.Collections.Specialized;
using System.Text;
using System.Collections.Generic;

namespace SilosApi
{
	public class Silos
	{
		private string host;
		private string port;
		private string key;
		private List<Tuple<String,String>> fileds;
		public Silos(string Host,string Port,string Key)
		{
			this.host = Host;
			this.port = Port;
			this.key = Key;
			fileds = new List<Tuple<String,String>> ();
		}
		public string Debug(string LogMsg)
		{
			return this.Send(LogMsg,1);
		}
		public string Information(string LogMsg)
		{
			return this.Send(LogMsg,2);
		}
		public string Warnings(string LogMsg)
		{
			return this.Send (LogMsg,3);
		}
		public string Error(string LogMsg)
		{
			return this.Send (LogMsg,4);
		}
		public string Fatal(string LogMsg)
		{
			return this.Send (LogMsg,5);
		}
		public void setFiled(string name,string value)
		{
			this.fileds.Add (new Tuple<string,string>(name, value));
		}
		private string Send(string LogMsg,int LogValue)
		{

			Uri uri=new Uri(string.Format ("{0}:{1}/api/call/{2}",this.host ,this.port, this.key));


			WebRequest request = WebRequest.Create (uri);
			request.Method = "POST";
			string postData = String.Format ("&LogMsg={0}&LogSeverity={1}", LogMsg,LogValue);
			foreach (Tuple<string,string> i in this.fileds) {
				postData += String.Format ("&{0}={1}", i.Item1, i.Item2);
			}
			System.Console.WriteLine (postData);
			// Create POST data and convert it to a byte array.
			byte[] byteArray = Encoding.UTF8.GetBytes (postData);
			// Set the ContentType property of the WebRequest.
			request.ContentType = "application/x-www-form-urlencoded";
			// Set the ContentLength property of the WebRequest.
			request.ContentLength = byteArray.Length;
			// Get the request stream.
			Stream dataStream = request.GetRequestStream ();
			// Write the data to the request stream.
			dataStream.Write (byteArray, 0, byteArray.Length);
			// Close the Stream object.
			dataStream.Close ();
			// Get the response.
			WebResponse response = request.GetResponse ();
			// Display the status.
			//Console.WriteLine (((HttpWebResponse)response).StatusDescription);
			// Get the stream containing content returned by the server.
			dataStream = response.GetResponseStream ();
			// Open the stream using a StreamReader for easy access.
			StreamReader reader = new StreamReader (dataStream);
			// Read the content.
			string responseFromServer = reader.ReadToEnd ();
			// Display the content.

			// Clean up the streams.
			reader.Close ();
			dataStream.Close ();
			response.Close ();
			return responseFromServer;
		}
	}
}

