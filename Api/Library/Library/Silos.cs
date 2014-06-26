using System;
using System.Net;
using System.IO;
using System.Collections.Specialized;
using System.Text;
namespace SilosApi
{
	public class Silos
	{
		private string host;
		private string port;
		private string key;
		public Silos(string Host,string Port,string Key)
		{
			this.host = Host;
			this.port = Port;
			this.key = Key;
		}
		public string Debug(string LogName,string LogBody,string LogThread)
		{
			return this.Send(LogName,LogBody,LogThread,1);
		}
		public string Information(string LogName,string LogBody,string LogThread)
		{
			return this.Send(LogName,LogBody,LogThread,2);
		}
		public string Warnings(string LogName,string LogBody,string LogThread)
		{
			return this.Send(LogName,LogBody,LogThread,3);
		}
		public string Error(string LogName,string LogBody,string LogThread)
		{
			return this.Send(LogName,LogBody,LogThread,4);
		}
		public string Fatal(string LogName,string LogBody,string LogThread)
		{
			return this.Send(LogName,LogBody,LogThread,5);
		}
		private string Send(string LogName,string LogBody,string LogThread,int LogSeverity)
		{
			Uri uri=new Uri(string.Format ("{0}:{1}/api/call/{2}",this.host ,this.port, this.key));


			WebRequest request = WebRequest.Create (uri);
			request.Method = "POST";

			// Create POST data and convert it to a byte array.
			string postData = String.Format ("&logName={0}&logBody={1}&logThread={2}&logSeverity={3}", LogName, LogBody,LogThread,LogSeverity);
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

