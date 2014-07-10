using System;
using SilosApi;
namespace Example
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Silos api = new Silos ("http://localhost", "3000", "5qW8vPbh9iCux9GjGswr2GsApsNgA2s2exkM9uwYmiDgkXZaLr5b6Afk9bYw3iCQ");
			api.setFiled ("pole21", "wartosc");
			String respond = api.Debug ("{ \"LogMsg\":\"t\" , \"pole23\":3}");
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
