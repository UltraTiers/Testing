import { SiteShell } from "@/components/site-shell";
import { fetchPlayers } from "@/lib/api";

export default async function DocsPage() {
  const players = await fetchPlayers();

  // Calculate tested players stats
  const totalPlayers = players.length;
  const testedTiers = players.reduce((sum, p) => sum + p.tiers.length, 0);
  
  // Count players by tier
  const tierCounts: Record<string, number> = {};
  players.forEach(player => {
    player.tiers.forEach(tier => {
      tierCounts[tier.tier] = (tierCounts[tier.tier] || 0) + 1;
    });
  });

  const docsContent = (
    <>
      <div className="docs-container">
        <div className="docs-tabs">
          <button className="docs-tab active">About</button>
          <button className="docs-tab">Stats</button>
          <button className="docs-tab">Points</button>
        </div>

        <section className="docs-section">
          <h2>About UltraTiers</h2>
          <p>
            UltraTiers is a comprehensive ranking system for UltraPVP network players. 
            It tracks player performance across all game modes and provides a unified point system 
            to compare overall skill and dedication across the network.
          </p>
        </section>
      </div>
    </>
  );

  return <SiteShell initialPlayers={players} isDocsPage={true} docsContent={docsContent} />;
}