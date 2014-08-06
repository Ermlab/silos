import urllib.request
import urllib.parse
class Api:
    def __init__(self,Host,Port,Key):
        self.host=Host
        self.port=Port
        self.key=Key
        self.table={}
    def setField(self,name,value):
        self.table[name]=value
    def _send(self,level,msg):
        self.table['LogMsg']=msg;
        self.table['LogSeverity']=level;        
        data=urllib.parse.urlencode(self.table)
        data = data.encode('utf-8')
        #key="3zHcA8g2rktr5QNTNN7bizYLmCioesZC73ieAQ8DTdGJ5D23ZGZwNF2CTJvu7uwX"
        #adr="http://localhost";
        #port="3000"
        urll="{0}:{1}/api/call/{2}".format(self.host,self.port,self.key);
        f = urllib.request.urlopen(urll,data)
        return f.read()
    def debug(self,msg):
        return self._send(1,msg)
    def Information(self,msg):
        return self._send(2,msg)
    def Warnings(self,msg):
        return self._send(3,msg)
    def Error(self,msg):
        return self._send(4,msg)
    def Fatal(self,msg):
        return self._send(5,msg)
