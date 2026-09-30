import { useState } from 'react';
import {
  Users,
  UserCheck,
  Clock,
  ShieldCheck,
  Search,
  Check,
  X,
  Warehouse,
  Send,
  Database,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function AdminGovernanceView({
  usersList = [],
  onApproveUser,
  onChangeRole,
  onToggleStatus,
  onDeleteUser,
  onRefresh
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const pendingUsers = usersList.filter(u => u.status === 'Pending Approval');
  const warehouseManagers = usersList.filter(u => u.role === 'Warehouse Manager' && u.status === 'Active');
  const reliefCoordinators = usersList.filter(u => u.role === 'Relief Coordinator' && u.status === 'Active');

  const filteredUsers = usersList.filter(u => {
    const matchesSearch =
      u.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.organization?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || (u.status || 'Active') === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="admin-governance-view" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Banner Explaining Administrator's Mandate */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
        color: '#ffffff',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 4px 12px rgba(6, 78, 59, 0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ maxWidth: '750px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <ShieldCheck size={20} color="#a7f3d0" />
            <h2 style={{ fontSize: '1.15rem', fontWeight: '700', margin: 0, letterSpacing: '0.01em' }}>
              System Governance & Access Approval
            </h2>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#d1fae5', lineHeight: '1.45' }}>
            As Administrator, you control platform governance and account verification. You decide whether new personnel are approved as <strong>Warehouse Managers</strong> (responsible for silos and grain intake) or <strong>Relief Coordinators</strong> (responsible for emergency food dispatches and warehouse oversight).
          </p>
        </div>

        {onRefresh && (
          <button
            type="button"
            onClick={onRefresh}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: '#ffffff',
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={14} />
            <span>Refresh Directory</span>
          </button>
        )}
      </div>

      {/* Top Governance Metric Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div style={{ background: '#ffffff', padding: '1.15rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Pending Approvals</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: pendingUsers.length > 0 ? '#b45309' : '#0f172a' }}>
            {pendingUsers.length}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Awaiting role confirmation</span>
        </div>

        <div style={{ background: '#ffffff', padding: '1.15rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Warehouse Managers</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Warehouse size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>
            {warehouseManagers.length}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Managing facility silos & intake</span>
        </div>

        <div style={{ background: '#ffffff', padding: '1.15rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Relief Coordinators</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Send size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>
            {reliefCoordinators.length}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Coordinating dispatches & relief</span>
        </div>

        <div style={{ background: '#ffffff', padding: '1.15rem 1.25rem', borderRadius: '10px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Total Platform Users</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f3e8ff', color: '#9333ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={16} />
            </div>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a' }}>
            {usersList.length}
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Registered accounts</span>
        </div>
      </div>

      {/* Pending Account Approvals Section */}
      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '1rem 1.25rem', background: '#faf5ff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={18} color="#7e22ce" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#4c1d95', margin: 0 }}>
              New Account Registrations & Role Decision Queue
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '999px', background: pendingUsers.length > 0 ? '#fef3c7' : '#ecfdf5', color: pendingUsers.length > 0 ? '#b45309' : '#047857' }}>
            {pendingUsers.length} Pending Approval
          </span>
        </div>

        {pendingUsers.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            <Check size={28} color="#16a34a" style={{ margin: '0 auto 0.5rem' }} />
            <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
              All new accounts have been reviewed.
            </p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
              When a new user signs up on the portal, their request will appear here for role assignment.
            </p>
          </div>
        ) : (
          <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {pendingUsers.map(user => (
              <div
                key={user._id || user.email}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: '#047857',
                    color: '#ffffff',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem'
                  }}>
                    {user.avatar || user.fullName?.slice(0, 2).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>
                      {user.fullName}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      {user.email} &bull; {user.phone || 'No phone'}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#475569', marginTop: '0.15rem' }}>
                      Org: <strong>{user.organization || 'National Agency'}</strong> &bull; Requested: <span style={{ color: '#d97706', fontWeight: '600' }}>{user.role}</span>
                    </div>
                  </div>
                </div>

                {/* Administrator Role Decision Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => onApproveUser && onApproveUser(user._id || user.email, 'Warehouse Manager')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '6px',
                      background: '#16a34a',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                    title="Allow account as Warehouse Manager"
                  >
                    <Warehouse size={13} />
                    <span>Allow as Warehouse Manager</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onApproveUser && onApproveUser(user._id || user.email, 'Relief Coordinator')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.75rem',
                      borderRadius: '6px',
                      background: '#0284c7',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                    title="Allow account as Relief Coordinator"
                  >
                    <Send size={13} />
                    <span>Allow as Relief Coordinator</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onDeleteUser && onDeleteUser(user._id || user.email)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.45rem 0.65rem',
                      borderRadius: '6px',
                      background: '#ffffff',
                      color: '#dc2626',
                      border: '1px solid #fca5a5',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                    title="Decline and remove account request"
                  >
                    <X size={13} />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Master Users Directory & Role Management */}
      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
              System Personnel & Role Assignments
            </h3>
            <p style={{ margin: '0.15rem 0 0', fontSize: '0.75rem', color: '#64748b' }}>
              Assign or switch roles between Warehouse Manager and Relief Coordinator at any time
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="Search personnel..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  padding: '0.45rem 0.65rem 0.45rem 2rem',
                  fontSize: '0.8rem',
                  borderRadius: '6px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  minWidth: '180px'
                }}
              />
            </div>

            <select
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
              style={{
                padding: '0.45rem 0.65rem',
                fontSize: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#334155'
              }}
            >
              <option value="All">All Roles</option>
              <option value="Warehouse Manager">Warehouse Manager</option>
              <option value="Relief Coordinator">Relief Coordinator</option>
              <option value="Administrator">Administrator</option>
            </select>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              style={{
                padding: '0.45rem 0.65rem',
                fontSize: '0.8rem',
                borderRadius: '6px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#334155'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
            <thead>
              <tr style={{ background: '#f8fafc', color: '#475569', textAlign: 'left', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>User</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>Organization</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>Assigned Role (Switchable)</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                    No users match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => {
                  const isPending = user.status === 'Pending Approval';
                  const isSuspended = user.status === 'Suspended';
                  return (
                    <tr key={user._id || user.email} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '50%',
                            background: user.role === 'Administrator' ? '#7e22ce' : user.role === 'Relief Coordinator' ? '#0284c7' : '#16a34a',
                            color: '#ffffff',
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem'
                          }}>
                            {user.avatar || user.fullName?.slice(0, 2).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div style={{ fontWeight: '600', color: '#0f172a' }}>{user.fullName}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{user.email}</div>
                          </div>
                        </div>
                      </td>

                      <td style={{ padding: '0.85rem 1rem', color: '#334155' }}>
                        {user.organization || 'National Agency'}
                      </td>

                      {/* Dropdown to switch roles in real-time */}
                      <td style={{ padding: '0.85rem 1rem' }}>
                        <select
                          value={user.role}
                          onChange={e => onChangeRole && onChangeRole(user._id || user.email, e.target.value)}
                          style={{
                            padding: '0.35rem 0.65rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            borderRadius: '6px',
                            border: '1px solid #cbd5e1',
                            background:
                              user.role === 'Administrator'
                                ? '#f3e8ff'
                                : user.role === 'Relief Coordinator'
                                ? '#e0f2fe'
                                : '#dcfce7',
                            color:
                              user.role === 'Administrator'
                                ? '#7e22ce'
                                : user.role === 'Relief Coordinator'
                                ? '#0369a1'
                                : '#15803d',
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Warehouse Manager">Warehouse Manager</option>
                          <option value="Relief Coordinator">Relief Coordinator</option>
                          <option value="Administrator">Administrator</option>
                        </select>
                      </td>

                      <td style={{ padding: '0.85rem 1rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '999px',
                          fontSize: '0.7rem',
                          fontWeight: '700',
                          background: isPending ? '#fef3c7' : isSuspended ? '#fee2e2' : '#ecfdf5',
                          color: isPending ? '#b45309' : isSuspended ? '#b91c1c' : '#047857'
                        }}>
                          {user.status || 'Active'}
                        </span>
                      </td>

                      <td style={{ padding: '0.85rem 1rem', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                          {isPending ? (
                            <button
                              type="button"
                              onClick={() => onApproveUser && onApproveUser(user._id || user.email, user.role || 'Warehouse Manager')}
                              style={{
                                padding: '0.25rem 0.55rem',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                borderRadius: '4px',
                                background: '#16a34a',
                                color: '#ffffff',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => onToggleStatus && onToggleStatus(user._id || user.email, isSuspended ? 'Active' : 'Suspended')}
                              style={{
                                padding: '0.25rem 0.55rem',
                                fontSize: '0.7rem',
                                fontWeight: '600',
                                borderRadius: '4px',
                                background: isSuspended ? '#dcfce7' : '#fef2f2',
                                color: isSuspended ? '#15803d' : '#dc2626',
                                border: '1px solid',
                                borderColor: isSuspended ? '#bbf7d0' : '#fecaca',
                                cursor: 'pointer'
                              }}
                            >
                              {isSuspended ? 'Activate' : 'Suspend'}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onDeleteUser && onDeleteUser(user._id || user.email)}
                            style={{
                              padding: '0.25rem 0.45rem',
                              fontSize: '0.7rem',
                              borderRadius: '4px',
                              background: '#ffffff',
                              color: '#64748b',
                              border: '1px solid #e2e8f0',
                              cursor: 'pointer'
                            }}
                            title="Remove account"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Boundary Matrix & System Health Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Role Separation Specification Card */}
        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <AlertCircle size={18} color="#047857" />
            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
              Gotera Operational Role Boundaries
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.78rem', color: '#475569' }}>
            <div style={{ padding: '0.6rem 0.75rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #7e22ce' }}>
              <strong style={{ color: '#7e22ce' }}>1. Administrator (System Governor)</strong>
              <div style={{ marginTop: '0.2rem' }}>
                Governs account approvals and verifies personnel credentials. Allows users to operate as Warehouse Managers or Relief Coordinators. Does not handle daily grain logistics.
              </div>
            </div>

            <div style={{ padding: '0.6rem 0.75rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #16a34a' }}>
              <strong style={{ color: '#16a34a' }}>2. Warehouse Manager (Operational Silo Custodian)</strong>
              <div style={{ marginTop: '0.2rem' }}>
                Maintains local grain reserves, monitors moisture and storage saturation, and processes grain intake from agricultural cooperatives.
              </div>
            </div>

            <div style={{ padding: '0.6rem 0.75rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '3px solid #0284c7' }}>
              <strong style={{ color: '#0284c7' }}>3. Relief Coordinator (National Operations Overseer)</strong>
              <div style={{ marginTop: '0.2rem' }}>
                Oversees warehouse managers&apos; work, evaluates regional emergency aid requisitions, dispatches grain shipments, and reviews strategic national reserve analytics.
              </div>
            </div>
          </div>
        </div>

        {/* Database & Cloud Cluster Status */}
        <div style={{ background: '#ffffff', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <Database size={18} color="#0284c7" />
            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>
              Atlas Cloud Cluster Infrastructure
            </h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Cluster Host:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>gotera.h5rs0kp.mongodb.net</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Active Database:</span>
              <span style={{ fontWeight: '600', color: '#047857' }}>gotera</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Replica Set:</span>
              <span style={{ fontWeight: '600', color: '#0f172a' }}>atlas-qevn7s-shard-0</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b' }}>Connection Architecture:</span>
              <span style={{ fontWeight: '600', color: '#16a34a' }}>3 Shard Nodes Live (SSL/TLS)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0' }}>
              <span style={{ color: '#64748b' }}>Security Protocol:</span>
              <span style={{ fontWeight: '600', color: '#7e22ce' }}>RBAC & Mongoose Schema Validation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
