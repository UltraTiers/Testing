import { SiteShell } from "@/components/site-shell";
import { fetchPlayers } from "@/lib/api";
import { DocsContent } from "@/components/docs-content";

export default async function Home() {
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
    <DocsContent 
      totalPlayers={totalPlayers}
      testedTiers={testedTiers}
      tierCounts={tierCounts}
    />
  );

  return <SiteShell initialPlayers={players} docsContent={docsContent} />;
}
