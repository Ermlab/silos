using System;
using SilosApi;
namespace Example
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Silos api = new Silos ("http://localhost", "3000", "Zudx9pagWS9DKt2ZmtKzeLidLPuP29w8on628bWjTL9kziKmyWngLYgSo354vjgJ");
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
