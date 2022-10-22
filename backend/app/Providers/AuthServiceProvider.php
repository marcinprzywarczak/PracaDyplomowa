<?php

namespace App\Providers;

use App\Models\Firm;
use App\Models\MessageHeader;
use App\Models\Offer;
use App\Models\User;
use App\Policies\FirmPolicy;
use App\Policies\MessageHeaderPolicy;
use App\Policies\OfferPolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Offer::class => OfferPolicy::class,
        MessageHeader::class => MessageHeaderPolicy::class,
        User::class => UserPolicy::class,
        Firm::class => FirmPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
