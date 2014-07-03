using System;
using SilosApi;
namespace Example
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Silos api = new Silos ("http://localhost", "3000", "tEmYM7jBEddHc9ELT4z8yLDEemsvEWrB58J5rYxoPpqgDTc7Tg4ZqkYjvpMz6Wuv");
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
