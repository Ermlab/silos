using System;
using SilosApi;
namespace Example
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Silos api = new Silos ("http://localhost", "3000", "XexC2R7YoPH4J8b4t99oj62u7M72JfiKr4nt2pPGfuGztZuegq6D36hW28WWfp7c");
			api.setFiled ("pole 23", "wartosc");
			String respond = api.Debug ("wiadomosc");
			/*
			 * Rest of api logging function 
			 * each function has the same parameters
			 * api.Information
			 * api.Warnings
			 * api.Error
			 * api.Fatal
			 * 
			 * add reference to file Library.dll from Library/Library/bin/Debug  
			 * 
			 */
			Console.WriteLine (respond);
			Console.ReadLine ();
		}
	}
}
