using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Configuration;

namespace UserStorage
{
    public class DiskWriter
    {
        private static string desktopPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
        private static string usersFolderName = ConfigurationManager.AppSettings["ProfilesFolderName"];
        private static string usersFolderPath = desktopPath + "/" + usersFolderName;

        public static void Write(string userProfileJson)
        {
            CreateDirectoryIfDoesntExist();
            CreateAndWriteToFile(userProfileJson);
        }

        private static void CreateDirectoryIfDoesntExist()
        {
            if (!Directory.Exists(usersFolderPath))
                Directory.CreateDirectory(usersFolderPath);
        }

        private static void CreateAndWriteToFile(string userJson)
        {
            string filePath = PrepareFilePath();

            if (!File.Exists(filePath))
                File.WriteAllText(filePath, userJson);
        }

        private static string PrepareFilePath()
        {
            return usersFolderPath + "/softhouse.txt";
        }

    }
}
