"use client";

import { useMemo } from "react";
import { tierScores, modeGroups } from "@/lib/modes";

interface DocsContentProps {
  totalPlayers: number;
  playersWithTiers: number;
  uniqueTiers: number;
  tierCounts: Record<string, number>;
}

export function DocsContent({ totalPlayers, playersWithTiers, uniqueTiers, tierCounts }: DocsContentProps) {
  const tierEntries = useMemo(() => 
    Object.entries(tierScores).filter(([key]) => key !== "Unknown"),
    []
  );

  return (
    <div className="docs-container">
      <header className="docs-header">
        <h1>UltraTiers Documentation</h1>
      </header>

      <section className="docs-section">
        <h2>How the Point System Works</h2>
        <p>
          UltraTiers tracks player rankings across {Object.values(modeGroups).flat().length} different game modes. 
          Each tier assignment earns points based on the difficulty and prestige of achieving that rank.
        </p>
        
        <div className="point-system-grid">
          {tierEntries.map(([tier, points]) => (
            <div 
              key={tier} 
              className="point-card"
            >
              <div className="point-header">{tier}</div>
              <div className="point-value">{points} pts</div>
              <div 
                className="point-bar" 
                style={{width: `${(points / 60) * 100}%`}}
              ></div>
              <div className="point-desc">
                {tier.startsWith("HT") ? "Top position in gamemode" : "Leaderboard rank"}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section">
        <h2>Tier Breakdown</h2>
        <div className="tier-explanation">
          <div className="tier-row">
            <span className="tier-label ht">HT (High Tier)</span>
            <p>Players who achieved the top position in a specific gamemode</p>
          </div>
          <div className="tier-row">
            <span className="tier-label lt">LT (Low Tier)</span>
            <p>Players who are on the leaderboard but not at the top position</p>
          </div>
          <div className="tier-row">
            <span className="tier-label unknown">Unknown</span>
            <p>Players who have played but not yet ranked on the leaderboard</p>
          </div>
        </div>
      </section>

      <section className="docs-section">
        <h2>Game Mode Categories</h2>
        <div className="mode-categories">
          {Object.entries(modeGroups)
            .filter(([key]) => key !== "docs")
            .map(([key, modes]) => (
              <div key={key} className="category-card">
                <h3>
                  {key === "global" ? "All Modes" : key.charAt(0).toUpperCase() + key.slice(1) + " Modes"}
                </h3>
                <p>{modes.join(", ")}</p>
                <span className="category-count">{modes.length} modes</span>
              </div>
            ))}
        </div>
      </section>

      <section className="docs-section">
        <h2>Tested Players Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{totalPlayers.toLocaleString()}</div>
            <div className="stat-label">Total Players</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{playersWithTiers.toLocaleString()}</div>
            <div className="stat-label">Ranked Players</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{uniqueTiers}</div>
            <div className="stat-label">Tier Types</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{Object.values(modeGroups).flat().length}</div>
            <div className="stat-label">Game Modes</div>
          </div>
        </div>
        
        <div className="tier-distribution">
          <h3>Tier Distribution</h3>
          <div className="distribution-bars">
            {Object.entries(tierCounts)
              .filter(([tier]) => tier !== "Unknown" && tier !== "Unranked")
              .sort(([a], [b]) => {
                const order = ["LT5", "LT4", "LT3", "LT2", "LT1", "HT1", "HT2", "HT3", "HT4", "HT5"];
                return order.indexOf(a) - order.indexOf(b);
              })
              .map(([tier, count]) => {
                const validTiers = Object.keys(tierCounts).filter(t => t !== "Unknown" && t !== "Unranked");
                const maxCount = Math.max(...validTiers.map(t => tierCounts[t]));
                return (
                  <div key={tier} className="distribution-row">
                    <span className="distribution-tier">{tier}</span>
                    <div className="distribution-bar-container">
                      <div 
                        className="distribution-bar" 
                        style={{width: `${(count / maxCount) * 100}%`}}
                      ></div>
                    </div>
                    <span className="distribution-count">{count}</span>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section className="docs-section">
        <h2>About UltraTiers</h2>
        <p>
          UltraTiers is a comprehensive ranking system for UltraPVP network players. 
          It tracks player performance across all game modes and provides a unified point system 
          to compare overall skill and dedication across the network.
        </p>
      </section>
    </div>
  );
}