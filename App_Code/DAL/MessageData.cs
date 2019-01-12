using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for MassageData
/// </summary>
public class MessageData
{
    private readonly Database _db;
    public MessageData()
    {
        _db = new Database();
    }

    internal DataTable GetChat(int loginId, int chatUser)
    {
        string cmd = string.Format("exec ChatView {0}, {1}", loginId, chatUser);
        return _db.ExecReader(cmd);
    }
}