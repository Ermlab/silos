import http.client, urllib.parse

class Api:
    def __init__(self,Host,Port,Key):
        self.host=Host
        self.port=Port
        self.key=Key
    def _send(self):

        data=urllib.parse.urlencode({'LogMsg': "messege","Pole2":"Pole32"})
        headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
        conn = http.client.HTTPConnection('{0}/api/call/{2}'.format(self.host,self.port,self.key),self.port)
        print (conn.host)
        conn.request("POST", "", data,headers)
        response = conn.getresponse()
                                          


        
        return data
    def debug(self):
        return self._send()
