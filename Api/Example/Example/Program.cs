using System;
using SilosApi;
namespace Example
{
	class MainClass
	{
		public static void Main (string[] args)
		{
			Silos api = new Silos ("http://localhost", "3000", "s2xfyn6xjhMYeSB3CHDzaRGYSMM5rTjseo3ZaB2xjStRDBMiFkfxRTHYaiXDyKcX","LogThread");
			String respond=api.Error ("LogName"," LogBody");
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
