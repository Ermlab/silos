using System;
using SilosApi;
namespace Example
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Silos api = new Silos ("http://localhost", "3000", "9viMWoSkzqoZ63uindXivBD4p3Wno7Pu3SzSB3Rvrw3porBzhP9TToEfA2ug5hjj","LogThread");
			String respond=api.Debug ("Nastepny"," Tresc","tag2 tag4");
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
