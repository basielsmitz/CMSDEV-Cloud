<?php

/* core/themes/classy/templates/content-edit/filter-tips.html.twig */
class __TwigTemplate_8b261aad11b2cfc3f22950a5a3df3458537b7fce4b2f151aa3ec03f9e89d9344 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453 = $this->env->getExtension("Drupal\\webprofiler\\Twig\\Extension\\ProfilerExtension");
        $__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453->enter($__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "core/themes/classy/templates/content-edit/filter-tips.html.twig"));

        $tags = array("if" => 19, "for" => 28, "set" => 31);
        $filters = array("t" => 20, "length" => 23, "clean_class" => 33, "replace" => 45);
        $functions = array();

        try {
            $this->env->getExtension('Twig_Extension_Sandbox')->checkSecurity(
                array('if', 'for', 'set'),
                array('t', 'length', 'clean_class', 'replace'),
                array()
            );
        } catch (Twig_Sandbox_SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof Twig_Sandbox_SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof Twig_Sandbox_SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

        // line 19
        if (($context["multiple"] ?? null)) {
            // line 20
            echo "  <h2>";
            echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar(t("Text Formats")));
            echo "</h2>
";
        }
        // line 22
        echo "
";
        // line 23
        if (twig_length_filter($this->env, ($context["tips"] ?? null))) {
            // line 24
            echo "  ";
            if (($context["multiple"] ?? null)) {
                // line 25
                echo "    <div class=\"compose-tips\">
  ";
            }
            // line 27
            echo "
  ";
            // line 28
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable(($context["tips"] ?? null));
            foreach ($context['_seq'] as $context["name"] => $context["tip"]) {
                // line 29
                echo "    ";
                if (($context["multiple"] ?? null)) {
                    // line 30
                    echo "      ";
                    // line 31
                    $context["tip_classes"] = array(0 => "filter-type", 1 => ("filter-" . \Drupal\Component\Utility\Html::getClass(                    // line 33
$context["name"])));
                    // line 36
                    echo "      <div";
                    echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($context["tip"], "attributes", array()), "addClass", array(0 => ($context["tip_classes"] ?? null)), "method"), "html", null, true));
                    echo ">
      <h3>";
                    // line 37
                    echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute($context["tip"], "name", array()), "html", null, true));
                    echo "</h3>
    ";
                }
                // line 39
                echo "
    ";
                // line 40
                if (twig_length_filter($this->env, $this->getAttribute($context["tip"], "list", array()))) {
                    // line 41
                    echo "      <ul class=\"tips\">
      ";
                    // line 42
                    $context['_parent'] = $context;
                    $context['_seq'] = twig_ensure_traversable($this->getAttribute($context["tip"], "list", array()));
                    foreach ($context['_seq'] as $context["_key"] => $context["item"]) {
                        // line 43
                        echo "        ";
                        // line 44
                        $context["item_classes"] = array(0 => ((                        // line 45
($context["long"] ?? null)) ? (("filter-" . twig_replace_filter($this->getAttribute($context["item"], "id", array()), array("/" => "-")))) : ("")));
                        // line 48
                        echo "        <li";
                        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute($this->getAttribute($context["item"], "attributes", array()), "addClass", array(0 => ($context["item_classes"] ?? null)), "method"), "html", null, true));
                        echo ">";
                        echo $this->env->getExtension('Twig_Extension_Sandbox')->ensureToStringAllowed($this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->getAttribute($context["item"], "tip", array()), "html", null, true));
                        echo "</li>
      ";
                    }
                    $_parent = $context['_parent'];
                    unset($context['_seq'], $context['_iterated'], $context['_key'], $context['item'], $context['_parent'], $context['loop']);
                    $context = array_intersect_key($context, $_parent) + $_parent;
                    // line 50
                    echo "      </ul>
    ";
                }
                // line 52
                echo "
    ";
                // line 53
                if (($context["multiple"] ?? null)) {
                    // line 54
                    echo "      </div>
    ";
                }
                // line 56
                echo "  ";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['name'], $context['tip'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
            // line 57
            echo "
  ";
            // line 58
            if (($context["multiple"] ?? null)) {
                // line 59
                echo "    </div>
  ";
            }
        }
        
        $__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453->leave($__internal_b8a44bb7188f10fa054f3681425c559c29de95cd0490f5c67a67412aafc0f453_prof);

    }

    public function getTemplateName()
    {
        return "core/themes/classy/templates/content-edit/filter-tips.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  143 => 59,  141 => 58,  138 => 57,  132 => 56,  128 => 54,  126 => 53,  123 => 52,  119 => 50,  108 => 48,  106 => 45,  105 => 44,  103 => 43,  99 => 42,  96 => 41,  94 => 40,  91 => 39,  86 => 37,  81 => 36,  79 => 33,  78 => 31,  76 => 30,  73 => 29,  69 => 28,  66 => 27,  62 => 25,  59 => 24,  57 => 23,  54 => 22,  48 => 20,  46 => 19,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "core/themes/classy/templates/content-edit/filter-tips.html.twig", "/app/public/core/themes/classy/templates/content-edit/filter-tips.html.twig");
    }
}
