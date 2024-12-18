import React, { useState, useEffect } from "react";
import { getAccounts, addAccount, updateAccount, deleteAccount } from "../../Service/AccountService";
import "./ManageUser.css";

function User() {
  const [accounts, setAccounts] = useState([]);
  const [search, setSearch] = useState("");
  const [newAccount, setNewAccount] = useState({ email: "", role: "", isActive: true });
  const [editAccount, setEditAccount] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAccounts();
        setAccounts(response.$values || []);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const filteredAccounts = accounts.filter(
    (account) =>
      account.email.toLowerCase().includes(search.toLowerCase()) ||
      account.role.toLowerCase().includes(search.toLowerCase())
  );

  // Thêm tài khoản
  const handleAddAccount = async () => {
    try {
      await addAccount(newAccount);
      setNewAccount({ email: "", role: "", isActive: true });
      // Cập nhật lại danh sách tài khoản
      const response = await getAccounts();
      setAccounts(response.$values || []);
    } catch (error) {
      console.error("Error adding account:", error);
    }
  };

  // Cập nhật tài khoản
  const handleEditAccount = async () => {
    try {
      if (editAccount) {
        await updateAccount(editAccount.accountId, editAccount);
        setEditAccount(null);
        const response = await getAccounts();
        setAccounts(response.$values || []);
      }
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  // Xóa tài khoản
  const handleDeleteAccount = async (accountId) => {
    try {
      await deleteAccount(accountId);
      const response = await getAccounts();
      setAccounts(response.$values || []);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  return (
    <div className="user-home">
    <h1 className="user-mana">User Management</h1>
    
    {/* Input tìm kiếm */}
    <input className="user-search"
      type="text"
      placeholder="Search accounts..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    
    {/* Thêm tài khoản */}
    <div className="user-key">
      <input className="user-email"
        type="text"
        placeholder="Email"
        value={newAccount.email}
        onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
      />
      <input className="user-password"
        type="text"
        placeholder="Role"
        value={newAccount.role}
        onChange={(e) => setNewAccount({ ...newAccount, role: e.target.value })}
      />
      <button className="user-btn" onClick={handleAddAccount}>Add Account</button>
    </div>

    {/* Sửa tài khoản */}
    {editAccount && (
      <div className="user-edit">
        <input className="user-edit-email"
          type="text"
          value={editAccount.email}
          onChange={(e) => setEditAccount({ ...editAccount, email: e.target.value })}
        />
        <input className="user-edit-role"
          type="text"
          value={editAccount.role}
          onChange={(e) => setEditAccount({ ...editAccount, role: e.target.value })}
        />
        <button className="user-btn1" onClick={handleEditAccount}>Update Account</button>
      </div>
    )}

    {/* Bảng hiển thị tài khoản */}
    <table className="user-table">
      <thead className="user-the">
        <tr className="user-tr">
          <th className="user-id">Account ID</th>
          <th className="user-e">Email</th>
          <th className="user-r">Role</th>
          <th className="user-s">Status</th>
          <th className="user-a">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((account) => (
            <tr className="user-account" key={account.accountId}>
              <td className="user-account-id">{account.accountId}</td>
              <td className="user-account-email">{account.email}</td>
              <td className="user-account-role">{account.role}</td>
              <td className="user-account-is">{account.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button className="user-btn1" onClick={() => setEditAccount(account)}>Edit</button>
                <button className="user-btn2" onClick={() => handleDeleteAccount(account.accountId)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr className="user-found">
            <td className="user-col" colSpan="5">No accounts found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
}

export default User;